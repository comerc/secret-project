@feature-cards-due
Feature: Set Card Due Reminder
  As a user
  I want to set a due reminder for a card
  So that I can be reminded of upcoming tasks

  Background:
    Given I am a registered user
    And I am logged in
    And I have existing cards with the following attributes:
      | closed | desc  | due  | dueComplete | dueReminder | id  | idList | name | start | subscribed |
      | true   | Desc1 | null | false       | null        | id1 | list1  | Card1| null  | false      |
      | false  | Desc2 | null | true        | null        | id2 | list2  | Card2| null  | true       |

  @valid @smoke-test
  Scenario Outline: Set a due reminder for a card
    Given the card <id> exists
    When a due reminder of <reminder> is set
    Then the card should have a due reminder of <expectedReminder>

    Examples:
      | id  | reminder | expectedReminder |
      | id1 | 2        | 2                |
      | id2 | 5        | 5                |

  @invalid @regression-test
  Scenario Outline: Attempt to set a due reminder for a non-existing card
    Given the card <id> does not exist
    When a due reminder of <reminder> is set
    Then an error should be displayed

    Examples:
      | id  | reminder |
      | id3 | 2        |
      | id4 | 5        |
