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

Vi bruker Vitest for testing av komponenter og snapshot testing. For å kjøre testene naviger til 'frontend' mappen

`cd .\prosjekt2\frontend`

Deretter kjør

`npm run test`

## End-to-end testing

Vi gjør end-to-end testing ved bruk av Cypress. Appen må være startet opp i frontend på forhånd for å kjøre disse testene. Se [her](#start-appen-i-frontend) for hvordan. For å kjøre testene, naviger til 'frontend'

`cd .\prosjekt2\frontend`

Deretter kjør

`npx cypress open`

I GUI-et som kommer opp trykk på:

`e2e testing`

Velg ønsket browser og klikk

`start e2e testing i browser`

Klikk deretter:

`homePage.cy.ts`

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

# Bugs

Legge/fjerne pokemons til team er noen ganger bugged på VM, men funker helt fint i localhost.