@feature-boards
Feature: View board
  As a user
  In order to view board information
  I want to be able to view the name and description of a board

  Background:
    Given I am a registered user
    And I am logged in
    And I have existing boards with the following attributes:
      | id  | name        | description       |
      | id1 | My Board #1 | My Description #1 |

  @valid @smoke-test
  Scenario: View the details of a board
    Given a board with the ID <id> exists
    And I have a board with the name <name>
    And I have a board with the description <description>
    When they request the details of the board
    Then the board's name should be <name>
    And the board's description should be <description>

  @invalid @regression-test
  Scenario: View the details of a non-existent board
    Given a board with the ID <id> does not exist
    When they request the details of the board
    Then an error message should be displayed indicating the board does not exist
