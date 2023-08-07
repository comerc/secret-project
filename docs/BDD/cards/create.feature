@feature-cards
Feature: Create New Card
  As a user
  In order to add tasks to a list
  I want to be able to create a new card in a specific list

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario: Create a new card in a list
    Given a user wants to create a new card with the name "New Card"
    And the user wants to add the new card to a list with the ID <listId>
    And the list with the ID <listId> exists
    When they create the new card
    Then a new card should be created with the name "New Card"
    And the new card should have a unique ID
    And the new card should be added to the list with the ID <listId>

    Examples:
      | listId  |
      | list-1  |
      | list-2  |

  @invalid @regression-test
  Scenario: Create a new card in a non-existent list
    Given a user wants to create a new card with the name "New Card"
    And the user wants to add the new card to a non-existent list with the ID <listId>
    And the list with the ID <listId> does not exist
    When they attempt to create the new card
    Then an error should be returned stating that the list does not exist

    Examples:
      | listId  |
      | list-1  |
      | list-2  |
