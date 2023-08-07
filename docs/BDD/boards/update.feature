@feature-boards
Feature: Edit board
  As a user
  In order to update board information
  I want to be able to edit the name and description of a board

  Background:
    Given I am a registered user
    And I am logged in
    And I have a board with the name "Test Board"

  @valid @smoke-test
  Scenario: Update the name of an existing board
    Given a user wants to update the name of an existing board
    And a board with the ID <id> exists
    When they provide a new name for the board as <name>
    Then the board's name should be updated to <name>

  @invalid @regression-test
  Scenario: Update the name of a non-existent board
    Given a user wants to update the name of a board
    And a board with the ID <id> does not exist
    When they provide a new name for the board as <name>
    Then an error message should be displayed indicating the board does not exist

  @invalid @regression-test
  Scenario: Update the name as empty of an existing board
    Given a user wants to update the name of an existing board
    And a board with the ID <id> exists
    When they provide an empty name for the board
    Then an error message should be displayed indicating that the name cannot be empty

  @valid @smoke-test
  Scenario: Update the description of an existing board
    Given a user wants to update the description of an existing board
    And a board with the ID <id> exists
    When they provide a new description for the board as <description>
    Then the board's description should be updated to <description>

  @invalid @regression-test
  Scenario: Update the description of a non-existent board
    Given a user wants to update the description of a board
    And a board with the ID <id> does not exist
    When they provide a new description for the board as <description>
    Then an error message should be displayed indicating the board does not exist
