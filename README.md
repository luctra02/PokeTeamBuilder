# Program Informasjon

PokeTeamBuilder er en nettside der brukeren kan få opp informasjon om alle pokemons fra første generasjon og lage et lag.
På hjemmesiden får brukeren informasjon som id-nummer, navn, bilde og type til de ulike pokemonene. 
Brukeren kan trykke på en pokemon for å få opp mer informasjon om den pokemonen.
Det er også mulig å legge til pokemons på et lag, men man kan bare ha maks 6 pokemons på laget.

# Installasjon og Setup Instruksjoner

For å kjøre appen lokalt må man først klone dette repositoriet. Du trenger node og npm installert globalt på maskinen din.

Krav:

Node version 20.5+
npm version 9.8+

## Installasjon:

## Start serveren i backend:

For å komme til backend mappen kjør

`cd .\prosjekt2\backend`

Etter det kan du installere de riktige pakkene ved

`npm install`

Serveren startes ved å kjøre

`npm start`

## Start appen i frontend:

Etter du har kjørtt serveren, åpne en ny terminal og kjør

`cd .\prosjekt2\frontend`

Etter det kan du installere de riktige pakkene ved

`npm install`

For å starte appen kjør

`npm run dev`

## For å besøke appen:

localhost:5173

# Testing

## Komponent testing

Vi bruker Vitest for testing av komponenter og snapshot testing alle tester har med coverage. For å kjøre testene naviger til 'frontend' mappen

`cd .\prosjekt2\frontend`

Deretter kjør

`npm run test`



## End-to-end testing

Vi gjør end-to-end testing ved bruk av Cypress. Appen må være startet opp i både frontend og backend på forhånd for å kjøre disse testene. Se [her](#start-serveren-i-backend) for hvordan. For å kjøre testene, naviger til 'frontend'

`cd .\prosjekt2\frontend`

Deretter kjør

`npx cypress open`

I GUI-et som kommer opp trykk på:

`e2e testing`

Velg ønsket browser og klikk

`start e2e testing i browser`

Klikk deretter:

`homePage.cy.ts`

## API testing

Vi gjør API-testing ved å kjøre en ApolloServer med Vitest. For å kjøre API-testing naviger til 'backend' mappen

`cd .\prosjekt2\frontend`

Deretter kjør

`npm run test`

# Navigasjon av nettsiden:

På hjemmesiden blir det vist 15 pokemons om gangen. Brukeren kan bla frem og tilbake mellom pokemons ved å bytte sidetallet på bunnen av hjemmesiden. 
Det er også mulig å søke på pokemons etter navn ved å bruke søkefeltet i navbaren. For å komme seg tilbake til hjemmesiden kan man trykke på "Home" i navbaren. 
Brukeren kan få opp mer informasjon om en pokemon hvis man trykker på pokemonen på hjemmesiden. 
Det er også mulig å legge til/fjerne pokemons fra laget ved å trykke på en knapp.
For å se hvilke pokemons som er på laget ditt kan man trykke på "My Team" i navbaren og få informasjon om pokemonene der og.
Det er også mulig å filtrere pokemon på typer og sortere dem på forskjellige stats. Default så blir de sortert på id.
Det er også mulig å skifte nettsiden til dark mode ved å trykke på dark mode knappen.

# Teknologi og valg

## Data

Vi fikk dataen vår fra https://graphqlpokemon.favware.tech/v7, et omfattende pokemon GraphQL API med nok av info om alle pokemon. Siden det ikke er mer enn rundt
1000 pokemon valgte vi å hente så mange som mulig. Dessverre hadde ikke den siste generasjonen av pokemon fungerende sprites, så vi valgte å bare hente pokemon fra
gen 1 til gen 8 (896 pokemon).

## Database

Vi valgte å bruke MongoDB database. Ingen av gruppemedlemmene hadde mye erfaring med å jobbe med databaser i prosjekt, så vi valgte MongoDB siden det var et av
databasealternativene presentert i forelesningene. Etter mer ressearch virket det som et godt, fleksibelt, og brukervennlig valg av database.

## Server

Vi bruker en Apollo server med GraphQL som query språk. Dette var også en av teknologiene presentert i forelesningen, og virket som en god kombo med valget vårt
av database og Apollo Client på klient siden vår.

### Valg av metoder

Vi har satt opp queries slik at man kan hente ut pokemons, team og typer fra databasen. Vi har også lagt til mutasjoner som lager team og legger/fjerner pokemons fra team.

# Bugs

Legge/fjerne pokemons til team er noen ganger bugged på VM, men funker helt fint i localhost.

# Refleksjon

## Global state management

Vi har valgt å håndtere global state management ved bruk av local- og session storage, for lagring av informasjon på klient siden. Vi har også sendt props mellom komponenter 
gjennom å bruke React hooken useNavigate. Vi har håndtert state management lokalt ved bruk av useState hooken. En annen løsning kunne vært å bruke Apollo Client local state management
til å lagre states globalt. Fordelen med dette er at det interagerer bedre med GraphQL og gjør caching mer effektivt, men vi valgte å bruke local- og session storage i stedet grunnet
mer erfaring med det. Dette ga oss mer tid til å prioritere andre aspekter ved prosjektet.

## Valg av komponenter

Vi har valgt å gjøre funksjonalitet som blir brukt flere steder på nettsiden til komponenter for å unngå duplikat kode. Vi har også tatt gjenbrukbarhet og lettlesbarhet av
koden i betraktning. 

Forklaringer for hvert komponent:

Pokemonkortene blir brukt flere steder i koden, spesifikt på hjemmesiden og teamsiden. Vi har derfor gjort pokemonkortene til et komponent (CardComponent). Dette komponentet viser 
pokemonene sammen med id-en og typen deres i form av en knapp.

Navbaren blir brukt på hele nettsiden, og er derfor lagt til i app filen. Denne er et eget komponent så vi slipper å skrive logikk for den inne i app filen, noe som holder den ryddig.

TeamDatabaseFunction og ChangeTeamComponent inneholder logikken for å legge til og fjerne pokemon fra teams. Vi har valgt å splitte logikken i to forskjellige komponenter for
bedre lesbarhet. TeamDatabaseFunction inneholder mutations for å forandre på dataen i databasen, mens ChangeTeamComponent inneholder queries for å sjekke om pokemons kan bli lagt til/
fjernet fra teams. ChangeTeamComponent bruker TeamDatabaseFunction, og CardComponent bruker ChangeTeamComponent.

DisplayTeam komponentet brukes bare på DisplayTeam pagen, men vi har valgt å ha det som et komponent for bedre kodefleksibilitet. Skulle vi ha arbeidet videre med prosjektet er det
sannsynlig at vi ville lagt til funkjsonalitet for å se andre brukere sine teams, hvor vi ville hatt bruk for dette komponentet. Dette komponentet viser pokemon i teamet til en bruker
i form av pokemonkortene nevnt tidligere.

DisplayCardComponent blir også bare brukt på én side, nemlig på hjemmesiden, men vi har valgt å ha det som et komponent for bedre kodefleksibilitet. Vi tenker det som sannsynlig at 
dette komponentet kan bli brukt flere steder hvis vi skulle lagt til mer funksjonalitet senere. Dette komponentet viser alle pokemonene i form av pokemonkortene nevnt tidligere.

StatComponent blir brukt mange ganger i DetailsCardComponent (én gang for hver stat). Vi har derfor gjort det til et komponent. Dette komponentet viser en pokemon sine stats i form
av linjer som er farget enten blå eller hvit.

DetailsCardComponent blir bare brukt på details siden, men siden den tar inn mange forskjellige komponenter har vi valgt å ha den som et eget komponent for bedre lesbarhet. Dette
komponentet viser en pokemon sammen med diverse annen informasjon, som for eksempel base stats.

TypeComponent brukes både i CardComponent og DetailsCardComponent, og er derfor et komponent. Dette komponentet brukes for å bestemme bakgrunnsfargen til typene (for eksempel grønn for grass).

TypesDropdown og SortDropdown brukes bare ett sted (homePage), men vi har valgt å ha det som et komponent for bedre kodefleksibilitet. For eksempel har vi vurdert å legge dem til på
display team siden, noe vi kunne ha gjort dersom vi skulle videreutvikle siden. Disse komponentene viser filtrering og sorteringsvalgene.

AddPokemonToDatabase er et komponent for å laste opp pokemon til databasen. Denne vil bare bli brukt dersom vi velger å legge til flere pokemon i databasen, eller hvis vi må legge til
pokemon igjen dersom de av en eller annen grunn blir fjernet. Grunnet at det bare blir brukti veldig spesifikke tilfeller har vi valgt å ha det som et komponent.

## Bærekraftig utvikling

Vi har implementert dynamisk lasting, slik at bare 16 pokemon blir hentet om gangen. Dette betyr at vi unngår å hente unødvendig data.

Vi har også valgt at søk ikke skal være automatisk. En bruker må trykke på enter for å søke etter noe, istedet for at det skjer automatisk når en de skriver noe i søkebaren. Dette
forhindrer unødvendige API calls mens brukeren skriver.

## Tilgjengelighet

Vi har brukt mange lyse farger på nettsiden, som gjør det lettere å navigere den. For eksempel har alle de forskjellige typene bakgrunnsfarger på hjemmesiden, og "add to team/remove from team"
knappen forandrer farge basert på om en pokemon er i et team eller ikke. Dette gjør det lettere å se forskjeller, men vi har også prøvd å kommunisere all inmformasjon på nettsiden gjennom tekst,
for å ta hensyn til personer med vansker for å se farger. For eksempel er alle typer kommunisert både med farge og tekst.

Vi har lagt til sort bakgrunn bak statsene på details siden sånn at de skal være lettere å se. Vi har også lagt til høyere kontraster diverse andre steder, og gjort sånn at search baren blir
highlighted når man trykker på den.

Hele nettsiden er navigerbar med tab for å ta hensyn til personer som ønsker å bruke bare tastaturet for å navigere nettsiden.

## Valg av funksjonalitet

### Søkemulighet

Vi har løst dette ved at brukeren kan søke på pokemons i inputfeltet som ligger i navbaren.

### Listebasert presentasjon

Vi har håndtert store resultatsett ved å hente ut kun de pokemonene som vises på skjermen. Pokemonene blir hentet fra databasen hver gang man søker, bytter side, filtrerer, sorterer eller viser team.

### Detaljer av hvert objekt

Brukeren kan klikke seg inn på alle pokemons og få mer informasjon som høyde, vekt og base stats.

### Brukergenerert data

Brukeren kan legge til eller fjerne pokemons fra laget sitt.

### Sortering og filtrering

Brukeren kan sortere på ulike attributter og rekkefølge. Det er også mulig å filtrere pokemons på typer.

# Feedback

Gjennom underveisinnleveringene fikk vi en del kommentarer på fargebruk og mangel av kontraster. For eksempel fikk vi feedback på at Add to team knappen og pokemon statsene kunne være litt vanskelig å se. Vi fikset på dette ved å legge til farger på Add to team knappen og legge til en mørkere bakgrunn bak statsene.

Vi fikk også en tilbakemelding om noen som ønsket å ha muligheten til å kunne sorte pokemon i descending order. Vi la derfor til muligheten for å velge om sorting skulle være ascending eller descending.

Vi hadde tidligere en dark mode på nettsiden, men det var mange som var misfornøyde med denne grunnet at mange av fargene blendet sammen. Vi valgte derfor å bare fjerne dark mode helt, siden vi ikke
så det som nødvendig å ha det. Vi vurderte å forandre på alle fargene for å passe bedre med dark mode, men mente at det var andre aspekter ved prosjektet det var viktigere å bruke tiden på.

# Videre arbeid

Skulle vi ha jobbet videre på dette prosjektet hadde vi sett på andre måter å håndtere global state management på, som for eksempel Apollo Client local state management.

Vi hadde lagt til ordentlig log in funskjonalitet slik at en bruker lett kunne hentet ut teamet sitt med et eget brukergenerert brukernavn, heller enn en tilfedig generert teamId.
Man kunne da ha sett teamet sitt på forskjellige enheter. Videre hadde vi sett på muligheten for å legge til funskjonalitet for å kunne se andre brukere sine teams, og gi dem ratings/reviews.

Vi ville også ha lagt til flere filtreringsmuligheter, som for eksempel filtrering på pokemon generasjoner eller filtrering på pokemon over en spesifikk vekt/høyde.

Vi hadde også vurdert å legge til en dark mode. Vi hadde en tidligere, men endte opp med å fjerne den. Hadde vi jobbet videre på prosjektet kunne vi ha forsøkt å legge den til igjen på en måte hvor den passet
inn med resten av siden.