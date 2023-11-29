describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.contains('PokemonTeamBuilder');
    cy.contains('Bulbasaur');
    cy.contains(56);
  });
});

describe('Navigation', () => {
  it('navigates to details page for bulbasaur', () => {
    cy.visit('/');
    cy.contains("Bulbasaur").click();
    cy.url().should('include', '/pokemonInfo/1');
    cy.contains('Weight');
  });
});

describe('Filter Pokemons', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(1000);
  });
  
  it('filter pokemons by electric type', () => {
    cy.get('#demo-simple-select').first().click();
    cy.contains('Electric').click();
    cy.contains('Pikachu');
  });

  it('search arti and check only correct types show up', () => {
    cy.get('input[placeholder="Search Pokemon Name..."]').type('Arti{enter}');
    cy.get('#demo-simple-select').first().click();
    cy.contains('Flying');
    cy.contains('Ice');
  });

});

describe('Team Interactions', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000);
    });

  it('add to team then remove', () => {
    cy.get('input[placeholder="Search Pokemon Name..."]').type('Articuno{enter}');
    cy.get('.pokemonCard').first().contains('Add to Team').click();
    cy.contains('Remove from Team').should('exist')
    cy.get('.pokemonCard').first().click()
    cy.contains('Remove from Team').click();
    cy.contains('Add to Team')
  });

  it('check my team page', () => {
    cy.get('input[placeholder="Search Pokemon Name..."]').type('Eternatus{enter}');
    cy.get('.pokemonCard').first().contains('Add to Team').click();
    cy.contains('Remove from Team').should('exist')
    cy.contains('My Team').click()
    cy.contains('Remove from Team').click();
    cy.contains('Add to Team').should('not.exist');
  });
});

describe('Sorting and Filtering', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000);
    });

  it('Sort by weight ascending', () => {
    cy.get('.dropdown').eq(1).click(); 
    cy.contains('Weight').click();
    cy.get('.pokemonCard').first().should('contain.text', 'Cosmog');
  });

  it('Sort by height descending', () => {
    cy.get('.dropdown').eq(1).click(); 
    cy.contains('Height').click();
    cy.get('.sortButton').click();
    cy.get('.pokemonCard').first().should('contain.text', 'Eternatus');
  });

  it('Filter by Water', () => {
    cy.get('.dropdown').eq(0).click(); 
    cy.contains('Fighting').click();
    cy.get('.sortButton').click();
    cy.get('.pokemonCard').first().should('contain.text', 'Urshifu');
  });
});



