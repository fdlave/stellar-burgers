/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление булки и начинки в конструктор', () => {
    cy.contains('Булки').click({ force: true });

    cy.contains('Добавить')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.contains('Начинки').click({ force: true });

    cy.contains('Добавить')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.contains('(верх)').should('exist');
    cy.contains('(низ)').should('exist');
  });

  it('Открытие и закрытие страницы ингредиента', () => {
    cy.get('a[href^="/ingredients/"]')
      .first()
      .click({ force: true });

    cy.url().should('include', '/ingredients/');
    cy.contains('Детали ингредиента').should('exist');

    cy.go('back');

    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Оформление заказа', () => {
    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'test@test.ru',
          name: 'Test User'
        }
      }
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        order: {
          number: 12345
        }
      }
    }).as('createOrder');

    cy.setCookie('accessToken', 'test-access-token');

    cy.window().then((win: Window) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    cy.visit('/');
    cy.wait('@getIngredients');

    cy.contains('Булки').click({ force: true });
    cy.contains('Добавить').first().click({ force: true });

    cy.contains('Начинки').click({ force: true });
    cy.contains('Добавить').first().click({ force: true });

    cy.contains('Оформить заказ').click({ force: true });

    cy.wait('@createOrder');
    cy.contains('12345').should('exist');

    cy.get('body').type('{esc}');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
