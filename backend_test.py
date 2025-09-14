#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for CS Portfolio
Tests all backend endpoints and functionality
"""

import requests
import json
import time
from datetime import datetime
import sys
import os

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BASE_URL}/api"

print(f"Testing Backend API at: {API_BASE}")
print("=" * 60)

class BackendTester:
    def __init__(self):
        self.passed_tests = 0
        self.failed_tests = 0
        self.test_results = []
        
    def log_result(self, test_name, success, message, response_data=None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'response_data': response_data,
            'timestamp': datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        if success:
            self.passed_tests += 1
        else:
            self.failed_tests += 1
            
        print(f"{status}: {test_name}")
        print(f"   {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
        print()
        
    def test_health_check(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_result(
                        "Health Check Endpoint", 
                        True, 
                        f"API is running - {data['message']}, Version: {data['version']}"
                    )
                    return True
                else:
                    self.log_result(
                        "Health Check Endpoint", 
                        False, 
                        "Response missing required fields (message, version)",
                        data
                    )
            else:
                self.log_result(
                    "Health Check Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Health Check Endpoint", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def test_personal_info(self):
        """Test GET /api/personal endpoint"""
        try:
            response = requests.get(f"{API_BASE}/personal", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['name', 'title', 'tagline', 'bio', 'email', 'phone', 'location', 'social_links']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    self.log_result(
                        "Personal Info API", 
                        True, 
                        f"Personal info retrieved successfully - Name: {data.get('name', 'N/A')}"
                    )
                    return True
                else:
                    self.log_result(
                        "Personal Info API", 
                        False, 
                        f"Missing required fields: {missing_fields}",
                        data
                    )
            else:
                self.log_result(
                    "Personal Info API", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Personal Info API", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def test_projects(self):
        """Test GET /api/projects endpoint"""
        try:
            response = requests.get(f"{API_BASE}/projects", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check first project structure
                        project = data[0]
                        required_fields = ['title', 'description', 'technologies', 'features', 'github_url', 'demo_url', 'status']
                        missing_fields = [field for field in required_fields if field not in project]
                        
                        if not missing_fields:
                            self.log_result(
                                "Projects API", 
                                True, 
                                f"Projects retrieved successfully - {len(data)} projects found"
                            )
                            return True
                        else:
                            self.log_result(
                                "Projects API", 
                                False, 
                                f"Project missing required fields: {missing_fields}",
                                project
                            )
                    else:
                        self.log_result(
                            "Projects API", 
                            True, 
                            "Projects endpoint working - No projects found (empty list)"
                        )
                        return True
                else:
                    self.log_result(
                        "Projects API", 
                        False, 
                        "Response is not a list",
                        data
                    )
            else:
                self.log_result(
                    "Projects API", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Projects API", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def test_skills(self):
        """Test GET /api/skills endpoint"""
        try:
            response = requests.get(f"{API_BASE}/skills", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['languages', 'frameworks', 'tools', 'concepts']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    # Check if all fields are arrays
                    array_fields = [field for field in required_fields if not isinstance(data[field], list)]
                    if not array_fields:
                        self.log_result(
                            "Skills API", 
                            True, 
                            f"Skills retrieved successfully - {len(data['languages'])} languages, {len(data['frameworks'])} frameworks"
                        )
                        return True
                    else:
                        self.log_result(
                            "Skills API", 
                            False, 
                            f"Fields should be arrays: {array_fields}",
                            data
                        )
                else:
                    self.log_result(
                        "Skills API", 
                        False, 
                        f"Missing required fields: {missing_fields}",
                        data
                    )
            else:
                self.log_result(
                    "Skills API", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Skills API", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def test_experience(self):
        """Test GET /api/experience endpoint"""
        try:
            response = requests.get(f"{API_BASE}/experience", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check first experience structure
                        exp = data[0]
                        required_fields = ['company', 'position', 'duration', 'location', 'description', 'achievements']
                        missing_fields = [field for field in required_fields if field not in exp]
                        
                        if not missing_fields:
                            self.log_result(
                                "Experience API", 
                                True, 
                                f"Experience retrieved successfully - {len(data)} experiences found"
                            )
                            return True
                        else:
                            self.log_result(
                                "Experience API", 
                                False, 
                                f"Experience missing required fields: {missing_fields}",
                                exp
                            )
                    else:
                        self.log_result(
                            "Experience API", 
                            True, 
                            "Experience endpoint working - No experience found (empty list)"
                        )
                        return True
                else:
                    self.log_result(
                        "Experience API", 
                        False, 
                        "Response is not a list",
                        data
                    )
            else:
                self.log_result(
                    "Experience API", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Experience API", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def test_education(self):
        """Test GET /api/education endpoint"""
        try:
            response = requests.get(f"{API_BASE}/education", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['degree', 'university', 'duration', 'gpa', 'relevant_courses', 'achievements']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    # Check if courses and achievements are arrays
                    if isinstance(data['relevant_courses'], list) and isinstance(data['achievements'], list):
                        self.log_result(
                            "Education API", 
                            True, 
                            f"Education retrieved successfully - {data['degree']} from {data['university']}"
                        )
                        return True
                    else:
                        self.log_result(
                            "Education API", 
                            False, 
                            "relevant_courses and achievements should be arrays",
                            data
                        )
                else:
                    self.log_result(
                        "Education API", 
                        False, 
                        f"Missing required fields: {missing_fields}",
                        data
                    )
            else:
                self.log_result(
                    "Education API", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Education API", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def test_contact_form_post(self):
        """Test POST /api/contact endpoint"""
        try:
            # Test data
            contact_data = {
                "name": "John Smith",
                "email": "john.smith@example.com",
                "message": "Hello! I'm interested in discussing potential collaboration opportunities. Your portfolio looks impressive!"
            }
            
            response = requests.post(
                f"{API_BASE}/contact", 
                json=contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'name', 'email', 'message', 'timestamp', 'status']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    if data['name'] == contact_data['name'] and data['email'] == contact_data['email']:
                        self.log_result(
                            "Contact Form POST", 
                            True, 
                            f"Contact message saved successfully - ID: {data['id']}"
                        )
                        return True, data['id']
                    else:
                        self.log_result(
                            "Contact Form POST", 
                            False, 
                            "Saved data doesn't match submitted data",
                            data
                        )
                else:
                    self.log_result(
                        "Contact Form POST", 
                        False, 
                        f"Response missing required fields: {missing_fields}",
                        data
                    )
            else:
                self.log_result(
                    "Contact Form POST", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Contact Form POST", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False, None
        
    def test_contact_form_get(self):
        """Test GET /api/contact endpoint"""
        try:
            response = requests.get(f"{API_BASE}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result(
                        "Contact Form GET", 
                        True, 
                        f"Contact messages retrieved successfully - {len(data)} messages found"
                    )
                    return True
                else:
                    self.log_result(
                        "Contact Form GET", 
                        False, 
                        "Response is not a list",
                        data
                    )
            else:
                self.log_result(
                    "Contact Form GET", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Contact Form GET", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def test_contact_form_validation(self):
        """Test contact form validation"""
        try:
            # Test with missing fields
            invalid_data = {
                "name": "John Smith"
                # Missing email and message
            }
            
            response = requests.post(
                f"{API_BASE}/contact", 
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error
                self.log_result(
                    "Contact Form Validation", 
                    True, 
                    "Form validation working correctly - rejected invalid data"
                )
                return True
            elif response.status_code == 200:
                self.log_result(
                    "Contact Form Validation", 
                    False, 
                    "Form should reject invalid data but accepted it"
                )
            else:
                self.log_result(
                    "Contact Form Validation", 
                    False, 
                    f"Unexpected response: HTTP {response.status_code}"
                )
        except Exception as e:
            self.log_result(
                "Contact Form Validation", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def test_initialize_data(self):
        """Test POST /api/initialize-data endpoint"""
        try:
            response = requests.post(f"{API_BASE}/initialize-data", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_result(
                        "Initialize Data", 
                        True, 
                        f"Data initialization successful - {data['message']}"
                    )
                    return True
                else:
                    self.log_result(
                        "Initialize Data", 
                        False, 
                        "Response missing message field",
                        data
                    )
            else:
                self.log_result(
                    "Initialize Data", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
        except Exception as e:
            self.log_result(
                "Initialize Data", 
                False, 
                f"Request failed: {str(e)}"
            )
        return False
        
    def run_all_tests(self):
        """Run all backend tests"""
        print("Starting Backend API Tests...")
        print("=" * 60)
        
        # Test 1: Health Check
        health_ok = self.test_health_check()
        
        if not health_ok:
            print("❌ CRITICAL: Health check failed - API may not be running")
            print("Stopping tests due to critical failure")
            return
            
        # Test 2: Initialize data first
        self.test_initialize_data()
        
        # Wait a moment for data to be initialized
        time.sleep(2)
        
        # Test 3: Personal Info
        self.test_personal_info()
        
        # Test 4: Projects
        self.test_projects()
        
        # Test 5: Skills
        self.test_skills()
        
        # Test 6: Experience
        self.test_experience()
        
        # Test 7: Education
        self.test_education()
        
        # Test 8: Contact Form POST
        contact_success, contact_id = self.test_contact_form_post()
        
        # Test 9: Contact Form GET
        self.test_contact_form_get()
        
        # Test 10: Contact Form Validation
        self.test_contact_form_validation()
        
        # Print summary
        self.print_summary()
        
    def print_summary(self):
        """Print test summary"""
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.passed_tests + self.failed_tests}")
        print(f"✅ Passed: {self.passed_tests}")
        print(f"❌ Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests / (self.passed_tests + self.failed_tests) * 100):.1f}%")
        
        if self.failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['message']}")
        
        print("\n" + "=" * 60)

if __name__ == "__main__":
    tester = BackendTester()
    tester.run_all_tests()