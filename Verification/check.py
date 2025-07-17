from selenium import webdriver

# Provide the full path to the WebDriver executable
driver_path = 'D:\\chromedriver-win64\\chromedriver.exe'  # Change to the actual path of your WebDriver

# Initialize the WebDriver
driver = webdriver.Chrome(executable_path=driver_path)  # For Chrome
# driver = webdriver.Firefox(executable_path=driver_path)  # For Firefox
