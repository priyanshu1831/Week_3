# Import necessary modules
from behave import given, then
from selenium import webdriver

def before_scenario(context, scenario):
    context.driver = webdriver.Chrome()
 
def after_scenario(context, scenario):
    context.driver.quit()

# Step definitions for Leave Form
@given('the user is on the leave form page')
def step_user_on_leave_form_page(context):
    context.driver.get('http://localhost:4200/leave')
 
@then('the user should see the Leave Form component')
def step_user_should_see_leave_form_component(context):
    driver = context.driver