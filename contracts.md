# Portfolio API Contracts

## Overview
This document outlines the API contracts for the CS Student Portfolio application. The frontend currently uses mock data from `/frontend/src/data/mock.js` which needs to be replaced with real backend API calls.

## Database Models

### 1. Contact Messages
```python
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "unread"  # unread, read, replied
```

### 2. Projects
```python
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    features: List[str]
    github_url: str
    demo_url: str
    status: str  # completed, in-progress
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### 3. Skills
```python
class Skills(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    languages: List[str]
    frameworks: List[str]
    tools: List[str]
    concepts: List[str]
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 4. Experience
```python
class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    position: str
    duration: str
    location: str
    description: str
    achievements: List[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
```

### 5. Personal Info
```python
class PersonalInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    tagline: str
    bio: str
    email: str
    phone: str
    location: str
    resume_url: str
    social_links: dict
```

## API Endpoints

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `PUT /api/contact/{id}` - Update message status

### Projects Endpoints
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (admin)
- `PUT /api/projects/{id}` - Update project (admin)
- `DELETE /api/projects/{id}` - Delete project (admin)

### Skills Endpoints
- `GET /api/skills` - Get skills data
- `PUT /api/skills` - Update skills (admin)

### Experience Endpoints
- `GET /api/experience` - Get all experience
- `POST /api/experience` - Add experience (admin)
- `PUT /api/experience/{id}` - Update experience (admin)
- `DELETE /api/experience/{id}` - Delete experience (admin)

### Personal Info Endpoints
- `GET /api/personal` - Get personal information
- `PUT /api/personal` - Update personal info (admin)

## Frontend Integration Plan

### Files to Update:
1. `Contact.jsx` - Replace form submission with API call
2. `Projects.jsx` - Fetch projects from API
3. `About.jsx` - Fetch skills and personal info from API
4. `Experience.jsx` - Fetch experience and education from API
5. `Hero.jsx` - Fetch personal info from API
6. `Navbar.jsx` - Fetch personal info for name
7. `Footer.jsx` - Fetch personal info and social links

### Mock Data Migration:
- Remove `mock.js` file after backend integration
- Replace all `portfolioData` imports with API calls
- Add loading states and error handling
- Implement proper state management with React hooks

## Implementation Priority:
1. Personal Info API (needed by multiple components)
2. Contact Form API (most important user interaction)
3. Projects API (main portfolio content)
4. Skills API (about section)
5. Experience API (experience section)

## Error Handling:
- Implement proper error boundaries
- Add loading spinners
- Show user-friendly error messages
- Fallback to cached data if API fails

## Security:
- Input validation on all endpoints
- Rate limiting on contact form
- CORS configuration
- Admin authentication for write operations (future enhancement)