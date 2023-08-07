@feature-login
Feature: User Login
  As a registered user
  In order to access my account
  I want to be able to log in securely

  Background:
    Given the user is on the login page

  @valid @smoke-test
  Scenario: Successful login with valid credentials
    When the user enters valid credentials
    And clicks on the login button
    Then the user should be logged in successfully

  @invalid @regression-test
  Scenario: Failed login with invalid credentials
    When the user enters invalid credentials
    And clicks on the login button
    Then an error message should be displayed

  @invalid @regression-test
  Scenario Outline: Failed login with empty <field>
    Examples:
      | field     |
      | username  |
      | password  |
    When the user leaves the <field> field empty
    And clicks on the login button
    Then an error message should be displayed
