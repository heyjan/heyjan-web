<template>
  <div class="min-h-screen bg-dark-300">
    <AppHeader />
    
    <main class="section-padding">
      <div class="max-w-4xl mx-auto">
        <Breadcrumb />
        <h1 class="text-4xl md:text-5xl font-serif text-primary mb-8 mt-4">Impressum</h1>
        
        <div class="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8"></div>

        <div class="prose prose-invert max-w-none">
          <section class="mb-12">
            <h2 class="text-2xl font-serif text-white mb-4">Angaben gemäß § 5 TMG</h2>
            <div class="text-gray-300 space-y-2">
              <p><strong>Jan Mayer</strong></p>
              <p>Selbstständiger Entwickler & AI Consultant</p>
              <p class="text-gray-400">Adresse: Ringstraße 143, 89081 Ulm</p>
              <p class="text-gray-400">Kontakt:</p>
              <p>E-Mail: jan[at]heyjan[dot]de</p>
            </div>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-serif text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
            <div class="text-gray-300 space-y-2">
              <p><strong>Jan Mayer</strong></p>
              <p class="text-gray-400">Ringstraße 143</p>
              <p class="text-gray-400">89081 Ulm</p>
            </div>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-serif text-white mb-4">Haftungsausschluss</h2>
            
            <div class="space-y-8">
              <div>
                <h3 class="text-xl font-serif text-white mb-3">Haftung für Inhalte</h3>
                <p class="text-gray-300 leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 class="text-xl font-serif text-white mb-3">Haftung für Links</h3>
                <p class="text-gray-300 leading-relaxed">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 class="text-xl font-serif text-white mb-3">Datenschutz</h3>
                <p class="text-gray-300 leading-relaxed">
                  Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

useHead({
  title: 'Impressum - Jan Mayer',
  meta: [
    { name: 'description', content: 'Impressum und rechtliche Angaben gemäß TMG' }
  ]
})
</script>

<style scoped>
.prose {
  color: #E5E5E5;
}

.prose h2 {
  font-size: 1.875rem;
  font-family: var(--font-family-serif);
  color: white;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.5rem;
  font-family: var(--font-family-serif);
  color: white;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
  color: #E5E5E5;
}

.prose strong {
  color: white;
  font-weight: 600;
}
</style>

