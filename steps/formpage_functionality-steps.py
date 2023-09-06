from behave import *
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# Initialize the WebDriver (e.g., Chrome or Firefox)
driver = webdriver.Chrome()  # Use the appropriate WebDriver for your browser

# Navigate to your Angular application
driver.get('http://localhost:4200/leave')

@when('the user fills in the Leave Form with valid data')
def step_user_fills_leave_form(context):
    # Fill in the Leave Form with valid data
    wait = WebDriverWait(driver, 10)

    # Wait for the employee_name element to become visible
    employee_name = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'input[formControlName="employee_name"]')))
    employee_name.send_keys('John Smith')

    # Select the leave type "Casual"
    leave_type_casual = driver.find_element(By.CSS_SELECTOR, 'input[formControlName="leave_type"][value="Earned"]')
    leave_type_casual.click()

    # Fill in the leave from and leave to dates
    leave_from = driver.find_element(By.CSS_SELECTOR, 'input[formControlName="leave_from"]')
    leave_from.send_keys('20-08-2020')
    leave_to = driver.find_element(By.CSS_SELECTOR, 'input[formControlName="leave_to"]')
    leave_to.send_keys('23-08-2020')

    # Select the team name "AWS"
    team_name_aws = driver.find_element(By.CSS_SELECTOR, 'input[formControlName="team_name"][value="AWS"]')
    team_name_aws.click()

    # Select the manager name
    manager_name = driver.find_element(By.CSS_SELECTOR, 'select[formControlName="manager_name"]')
    manager_name.send_keys('Ranjan')

@when('submits the form')
def step_user_submits_form(context):
    submit_button = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
    submit_button.click()

def after_all(context):
    driver.quit()