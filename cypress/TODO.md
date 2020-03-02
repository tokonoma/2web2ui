# Cypress Testing Todos

As the team develops its testing strategy around Cypress, todo items have come up from time-to-time
that need to be tracked. For example, certain features could use additional testing, however, are
not currently feasible with the current Cypress feature set.

- [x] Write Node script to handle Cypress testing using the module API, particularly breaking up
      tests in to spec groups: https://docs.cypress.io/guides/guides/module-api.html

* [] Add tests for downloading CSVs once file downloading is added. See:
  https://github.com/cypress-io/cypress/issues/949

* [] Re-introduce failing tests that stem from tooltips that should be invisible when hidden. Will
  be doable once a new version of Matchbox is published:
  https://github.com/SparkPost/matchbox/pull/320

* [] Once screenshots/videos are retrievable, incorporate tests that check for accurate dates,
  paired with the `cy.clock()` method

* [] Resolve paths to the root of the project
  https://github.com/cypress-io/cypress/issues/3262#issuecomment-462646891
