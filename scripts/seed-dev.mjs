import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'

const env = process.env
const config = {
  host: env.MYSQLHOST || env.MYSQL_HOST || 'localhost',
  port: Number.parseInt(env.MYSQLPORT || env.MYSQL_PORT || env.RAILWAY_DB_PORT || '3306', 10),
  user: env.MYSQLUSER || env.MYSQL_USER || 'root',
  password: env.MYSQLPASSWORD || env.MYSQL_PASSWORD || env.MYSQL_ROOT_PASSWORD || '',
  database: env.MYSQLDATABASE || env.MYSQL_DATABASE || 'railway',
}

const demoUser = {
  email: 'demo@heyjan.local',
  password: 'demo12345',
  name: 'Demo User',
}

async function connectWithRetry(attempts = 20, delayMs = 3000) {
  let lastError

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const connection = await mysql.createConnection(config)
      return connection
    } catch (error) {
      lastError = error
      console.log(`DB not ready yet (${attempt}/${attempts})`)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }

  throw lastError
}

async function getAccountId(connection) {
  const [rows] = await connection.execute(
    'SELECT id FROM accounts WHERE email = ? LIMIT 1',
    [demoUser.email]
  )

  if (rows.length > 0) {
    return rows[0].id
  }

  const passwordHash = await bcrypt.hash(demoUser.password, 10)
  const [result] = await connection.execute(
    'INSERT INTO accounts (email, password_hash, name, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [demoUser.email, passwordHash, demoUser.name]
  )

  return result.insertId
}

async function ensureCategory(connection, accountId, category) {
  const [rows] = await connection.execute(
    'SELECT id FROM expense_categories WHERE account_id = ? AND name = ? AND type = ? LIMIT 1',
    [accountId, category.name, category.type]
  )

  if (rows.length > 0) {
    return rows[0].id
  }

  const [result] = await connection.execute(
    'INSERT INTO expense_categories (account_id, name, type, is_recurring, color, icon) VALUES (?, ?, ?, ?, ?, ?)',
    [accountId, category.name, category.type, category.isRecurring, category.color, category.icon]
  )

  return result.insertId
}

async function ensureExpense(connection, accountId, categoryId, expense) {
  const [rows] = await connection.execute(
    'SELECT id FROM expenses WHERE account_id = ? AND category_id = ? AND amount = ? AND transaction_date = ? LIMIT 1',
    [accountId, categoryId, expense.amount, expense.transactionDate]
  )

  if (rows.length > 0) {
    return
  }

  await connection.execute(
    'INSERT INTO expenses (account_id, category_id, amount, transaction_date, description, is_recurring) VALUES (?, ?, ?, ?, ?, ?)',
    [accountId, categoryId, expense.amount, expense.transactionDate, expense.description, expense.isRecurring]
  )
}

async function ensureRecurringPayment(connection, accountId, categoryId, payment) {
  const [rows] = await connection.execute(
    'SELECT id FROM recurring_payments WHERE account_id = ? AND name = ? LIMIT 1',
    [accountId, payment.name]
  )

  if (rows.length > 0) {
    return
  }

  await connection.execute(
    `INSERT INTO recurring_payments
      (account_id, name, amount, category_id, frequency, due_day, start_date, end_date, is_active, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      accountId,
      payment.name,
      payment.amount,
      categoryId,
      payment.frequency,
      payment.dueDay,
      payment.startDate,
      payment.endDate,
      payment.isActive,
      payment.notes,
    ]
  )
}

async function ensureGymCheckin(connection, accountId, checkin) {
  const [rows] = await connection.execute(
    'SELECT id FROM gym_checkins WHERE account_id = ? AND checkin_date = ? LIMIT 1',
    [accountId, checkin.checkinDate]
  )

  if (rows.length > 0) {
    return
  }

  await connection.execute(
    'INSERT INTO gym_checkins (account_id, checkin_date, session_type, notes) VALUES (?, ?, ?, ?)',
    [accountId, checkin.checkinDate, checkin.sessionType, checkin.notes]
  )
}

async function main() {
  const connection = await connectWithRetry()

  try {
    const accountId = await getAccountId(connection)

    const salaryCategoryId = await ensureCategory(connection, accountId, {
      name: 'Salary',
      type: 'income',
      isRecurring: false,
      color: '#15803d',
      icon: 'wallet',
    })

    const groceriesCategoryId = await ensureCategory(connection, accountId, {
      name: 'Groceries',
      type: 'expense',
      isRecurring: false,
      color: '#dc2626',
      icon: 'shopping-cart',
    })

    const rentCategoryId = await ensureCategory(connection, accountId, {
      name: 'Rent',
      type: 'expense',
      isRecurring: true,
      color: '#7c3aed',
      icon: 'house',
    })

    await ensureExpense(connection, accountId, salaryCategoryId, {
      amount: 4250.0,
      transactionDate: '2026-03-01',
      description: 'Monthly salary',
      isRecurring: false,
    })

    await ensureExpense(connection, accountId, groceriesCategoryId, {
      amount: 86.45,
      transactionDate: '2026-03-03',
      description: 'Weekly grocery run',
      isRecurring: false,
    })

    await ensureRecurringPayment(connection, accountId, rentCategoryId, {
      name: 'Apartment Rent',
      amount: 1450.0,
      frequency: 'monthly',
      dueDay: 1,
      startDate: '2026-01-01',
      endDate: null,
      isActive: true,
      notes: 'Seeded development recurring payment',
    })

    await ensureGymCheckin(connection, accountId, {
      checkinDate: '2026-03-05',
      sessionType: 'bjj',
      notes: 'Seeded development check-in',
    })

    console.log('Development seed complete')
    console.log(`Demo login: ${demoUser.email} / ${demoUser.password}`)
  } finally {
    await connection.end()
  }
}

main().catch((error) => {
  console.error('Development seed failed')
  console.error(error)
  process.exit(1)
})
