# 10000 Ideas - Business Ideas Platform

## Overview

This is a full-stack web application that helps middle-class entrepreneurs discover and explore business ideas. The platform provides curated business opportunities with detailed information about investment requirements, government support, success stories, and more. Built with React frontend and Java Spring Boot backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Java Spring Boot 3.2.1
- **Language**: Java 21
- **API Style**: RESTful API with JSON responses
- **Database**: H2 in-memory database for development
- **Build Tool**: Maven for dependency management and building

### Database Architecture
- **Database**: H2 in-memory database (development), easily configurable for PostgreSQL/MySQL in production
- **ORM**: Spring Data JPA with Hibernate
- **Schema Management**: Spring Boot auto DDL with data.sql for seed data
- **Connection**: Spring Boot managed database connections with connection pooling

## Key Components

### Data Models
- **Business Ideas**: Core entity with comprehensive business information including investment ranges, categories, government support, success stories, and training programs
- **Bookmarks**: User-saved business ideas for future reference
- **Complex JSON fields**: Investment details, government support schemes, success stories stored as JSONB

### UI Components
- **shadcn/ui**: Complete component library with Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Cards, filters, search, category navigation
- **Form Handling**: React Hook Form with Zod validation

### Business Logic
- **Search & Filtering**: Multi-criteria filtering by category, investment range, expertise level, special advantages, and government support
- **Data Presentation**: Rich business idea cards with ratings, views, and categorization
- **User Experience**: Responsive design with mobile-specific interactions

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Spring Boot REST controllers handle business logic and validation
3. **Storage Layer**: Spring Data JPA with Hibernate interfaces with H2 database
4. **Response**: JSON data flows back through the same path with type safety

### Search and Filtering Flow
- User inputs search terms or selects filters
- Frontend constructs query parameters
- Spring Boot backend processes filters and queries database
- Results are paginated and returned with metadata
- Frontend updates UI reactively through React Query

## External Dependencies

### UI and Styling
- **Radix UI**: Headless UI primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component library

### Data and State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema definition

### Development Tools
- **Vite**: Build tool with HMR and optimized production builds
- **TypeScript**: Type safety across the entire stack
- **ESLint/Prettier**: Code quality and formatting (implicit)

## Deployment Strategy

### Development Environment
- **Local Development**: Separate Spring Boot (port 5000) and Vite dev server (port 5173)
- **Hot Reload**: Vite HMR for frontend, Spring Boot DevTools for backend
- **Database**: H2 in-memory database with auto-initialization
- **Run Script**: `run.sh` to start both backend and frontend services

### Production Build
- **Frontend**: Vite builds optimized React bundle
- **Backend**: Maven packages Spring Boot JAR with embedded Tomcat
- **Assets**: Static files can be served from Spring Boot or separate CDN
- **Database**: H2 for development, configurable for PostgreSQL/MySQL in production

### Environment Configuration
- **Development**: H2 database auto-configured by Spring Boot
- **Production**: Configurable via `application.properties` for external database
- **Build Process**: Maven for backend, Vite for frontend, independent build systems

The application follows a clear separation between React frontend and Spring Boot backend, with REST API communication ensuring loose coupling and independent scalability.