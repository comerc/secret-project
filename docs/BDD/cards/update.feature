@feature-cards
Feature: Update Card
  As a user
  In order to keep my cards up to date
  I want to be able to update the details of a card

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario: Update card name and description
    Given a user wants to update the card with ID <cardId>
    And the user wants to change the name of the card to <newName>
    And the user wants to update the description of the card to <newDescription>
    When they update the card details
    Then the card with ID <cardId> should have the updated name <newName>
    And the card with ID <cardId> should have the updated description <newDescription>

    Examples:
      | cardId  | newName    | newDescription    |
      | card-1  | New Card 1 | Updated description of Card 1 |
      | card-2  | New Card 2 | Updated description of Card 2 |

  @invalid @regression-test
  Scenario: Update a non-existent card
    Given a user wants to update a non-existent card with ID <nonExistentCardId>
    When they attempt to update the card details
    Then an error should be returned stating that the card does not exist

    Examples:
      | nonExistentCardId  |
      | card-3             |
      | card-4             |
