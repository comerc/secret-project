@feature-boards
Feature: Create New Board
  As a user
  I want to be able to create a new board
  So that I can organize my tasks effectively

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario: Create a new board successfully
    When they provide a name for the board as <name>
    And they provide a description for the board as <description>
    Then a new board with the name <name> and description <description> should be created

  @invalid @regression-test
  Scenario: Create a new board without a name
    When I create a new board without a name
    Then an error message is displayed

  # @invalid @regression-test
  # Scenario: Create a new board with a long name
  #   When I create a new board with a name longer than 50 characters
  #   Then an error message is displayed

  @invalid @regression-test
  Scenario: Create a new board with a duplicate name
    Given a board with the name <name> already exists
    When I create a new board with the same name
    Then an error message is displayed

  @valid @regression-test
  Scenario: Create multiple new boards
    Given I have created a board with the name "Board 1"
    When I create a new board with the name "Board 2"
    Then both boards are created successfully

  @invalid @regression-test
  Scenario: Create a new board without being logged in
    Given I am not logged in
    When I create a new board with name "Test Board"
    Then an error message is displayed

  @invalid @regression-test
  Scenario: Create a new board with an invalid name
    When I create a new board with name <invalidName>
    Then an error message is displayed

  Examples:
    | name             | invalidName      | description
    | My Board         | 1234             | Project Board
    | Test Board       | #invalid$        | Task Board
