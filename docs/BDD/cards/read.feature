@feature-cards
Feature: View Card
  As a user
  In order to see the details of a specific card
  I want to be able to view the card information

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario: View card details
    Given a user wants to view the card with ID <cardId>
    When they request the card details
    Then the card with ID <cardId> should be returned
    And the card should have the name <cardName>
    And the card should have the description <cardDescription>

    Examples:
      | cardId  | cardName    | cardDescription    |
      | card-1  | Card 1      | Description of Card 1 |
      | card-2  | Card 2      | Description of Card 2 |

  @invalid @regression-test
  Scenario: View non-existent card
    Given a user wants to view a non-existent card with ID <nonExistentCardId>
    When they attempt to request the card details
    Then an error should be returned stating that the card does not exist

    Examples:
      | nonExistentCardId  |
      | card-3             |
      | card-4             |
