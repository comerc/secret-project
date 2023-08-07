@feature-cards
Feature: Close Card
  As a user
  In order to manage my cards effectively
  I want to be able to close a card

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario: Close a card
    Given a user wants to close the card with ID <cardId>
    When they close the card
    Then the card with ID <cardId> should be closed

    Examples:
      | cardId |
      | card-1 |
      | card-2 |

  @invalid @regression-test
  Scenario: Close a non-existent card
    Given a user wants to close a non-existent card with ID <nonExistentCardId>
    When they attempt to close the card
    Then an error should be returned stating that the card does not exist

    Examples:
      | nonExistentCardId |
      | card-3            |
      | card-4            |
