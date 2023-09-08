# Import necessary modules
from behave import given, then
from selenium import webdriver

# Define a fixture to set up and tear down the WebDriver
def before_scenario(context, scenario):
    context.driver = webdriver.Chrome()

def after_scenario(context, scenario):
    context.driver.quit()

# Step definitions for Show Data
@given('the user is on the Show Data page')
def step_user_on_show_data_page(context):
    context.driver.get('http://localhost:4200/showData')

@then('the user should see data displayed')
def step_user_should_see_data_displayed(context):
    driver = context.driver