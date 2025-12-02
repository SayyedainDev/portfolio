#!/bin/bash

# Portfolio Project Runner Script
# Automatically sets up and runs both backend and frontend

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Project directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Ports
BACKEND_PORT=5000
FRONTEND_PORT=5173

# Log files
BACKEND_LOG="/tmp/portfolio_backend.log"
FRONTEND_LOG="/tmp/portfolio_frontend.log"

# Banner
echo -e "${PURPLE}"
cat << "EOF"
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Portfolio Project Launcher                       ║
║   Sayyedain Saqlain - Full Stack Portfolio           ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Function to kill process on port
kill_port() {
    local port=$1
    echo -e "${YELLOW}🔍 Checking port $port...${NC}"

    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${RED}⚠️  Port $port is in use. Killing process...${NC}"
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
        sleep 1
        echo -e "${GREEN}✅ Port $port cleared${NC}"
    else
        echo -e "${GREEN}✅ Port $port is available${NC}"
    fi
}

# Function to check if directory exists
check_directory() {
    local dir=$1
    local name=$2

    if [ ! -d "$dir" ]; then
        echo -e "${RED}❌ Error: $name directory not found at $dir${NC}"
        exit 1
    fi
}

# Function to install dependencies
install_dependencies() {
    local dir=$1
    local name=$2

    echo -e "${CYAN}📦 Installing $name dependencies...${NC}"
    cd "$dir"

    if [ -f "package.json" ]; then
        if [ ! -d "node_modules" ]; then
            echo -e "${YELLOW}⬇️  Running npm install for $name...${NC}"
            npm install
            echo -e "${GREEN}✅ $name dependencies installed${NC}"
        else
            echo -e "${GREEN}✅ $name dependencies already installed${NC}"
        fi
    else
        echo -e "${RED}❌ Error: package.json not found in $dir${NC}"
        exit 1
    fi
}

# Function to create/update env file
create_env_file() {
    local dir=$1
    local env_file="$dir/.env"

    if [ "$dir" == "$BACKEND_DIR" ]; then
        echo -e "${CYAN}📝 Creating/updating backend .env file...${NC}"
        cat > "$env_file" << EOF
PORT=$BACKEND_PORT
NODE_ENV=development
FRONTEND_URL=http://localhost:$FRONTEND_PORT

# Email Configuration (for contact form)
# Replace with your actual email credentials
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EOF
        echo -e "${GREEN}✅ Backend .env file created${NC}"

    elif [ "$dir" == "$FRONTEND_DIR" ]; then
        echo -e "${CYAN}📝 Creating/updating frontend .env file...${NC}"
        cat > "$env_file" << EOF
VITE_API_URL=http://localhost:$BACKEND_PORT/api
EOF
        echo -e "${GREEN}✅ Frontend .env file created${NC}"
    fi
}

# Main execution
main() {
    echo -e "${BLUE}🔧 Starting setup process...${NC}\n"

    # Check directories
    echo -e "${CYAN}1️⃣  Checking project structure...${NC}"
    check_directory "$BACKEND_DIR" "Backend"
    check_directory "$FRONTEND_DIR" "Frontend"
    echo ""

    # Kill existing processes on ports
    echo -e "${CYAN}2️⃣  Clearing ports...${NC}"
    kill_port $BACKEND_PORT
    kill_port $FRONTEND_PORT
    echo ""

    # Install dependencies
    echo -e "${CYAN}3️⃣  Installing dependencies...${NC}"
    install_dependencies "$BACKEND_DIR" "Backend"
    install_dependencies "$FRONTEND_DIR" "Frontend"
    echo ""

    # Create/update .env files
    echo -e "${CYAN}4️⃣  Configuring environment variables...${NC}"
    create_env_file "$BACKEND_DIR"
    create_env_file "$FRONTEND_DIR"
    echo ""

    # Clear old logs
    > "$BACKEND_LOG"
    > "$FRONTEND_LOG"

    # Start backend
    echo -e "${CYAN}5️⃣  Starting backend server...${NC}"
    cd "$BACKEND_DIR"
    node server.js > "$BACKEND_LOG" 2>&1 &
    BACKEND_PID=$!
    echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
    echo -e "   📄 Logs: $BACKEND_LOG"
    echo -e "   🌐 URL: http://localhost:$BACKEND_PORT"
    echo ""

    # Wait for backend to start
    echo -e "${YELLOW}⏳ Waiting for backend to initialize...${NC}"
    sleep 3

    # Check backend health
    if curl -s http://localhost:$BACKEND_PORT/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend is healthy${NC}"
    else
        echo -e "${RED}⚠️  Backend might not be fully ready yet${NC}"
    fi
    echo ""

    # Start frontend
    echo -e "${CYAN}6️⃣  Starting frontend server...${NC}"
    cd "$FRONTEND_DIR"
    npm run dev > "$FRONTEND_LOG" 2>&1 &
    FRONTEND_PID=$!
    echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
    echo -e "   📄 Logs: $FRONTEND_LOG"
    echo -e "   🌐 URL: http://localhost:$FRONTEND_PORT"
    echo ""

    # Wait for frontend to start
    echo -e "${YELLOW}⏳ Waiting for frontend to build...${NC}"
    sleep 5

    # Success message
    echo -e "${GREEN}"
    cat << "EOF"
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   ✅ PORTFOLIO IS READY!                              ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"

    echo -e "${CYAN}📊 Server Status:${NC}"
    echo -e "   ${GREEN}●${NC} Backend:  http://localhost:$BACKEND_PORT"
    echo -e "   ${GREEN}●${NC} Frontend: http://localhost:$FRONTEND_PORT"
    echo ""

    echo -e "${CYAN}📝 Quick Commands:${NC}"
    echo -e "   ${YELLOW}• View backend logs:${NC}  tail -f $BACKEND_LOG"
    echo -e "   ${YELLOW}• View frontend logs:${NC} tail -f $FRONTEND_LOG"
    echo -e "   ${YELLOW}• Stop backend:${NC}       kill $BACKEND_PID"
    echo -e "   ${YELLOW}• Stop frontend:${NC}      kill $FRONTEND_PID"
    echo -e "   ${YELLOW}• Stop both:${NC}          kill $BACKEND_PID $FRONTEND_PID"
    echo ""

    echo -e "${CYAN}🔗 Open in browser:${NC}"
    echo -e "   ${BLUE}http://localhost:$FRONTEND_PORT${NC}"
    echo ""

    echo -e "${YELLOW}⚠️  Important Notes:${NC}"
    echo -e "   • Update email credentials in backend/.env for contact form"
    echo -e "   • Replace backend/resume.pdf with your actual resume"
    echo -e "   • Customize components in frontend/src/components/"
    echo ""

    echo -e "${GREEN}✨ Servers are running in the background!${NC}"
    echo -e "${YELLOW}Press Ctrl+C to view logs, or use the commands above to manage servers.${NC}"
    echo ""

    # Save PIDs to file for easy cleanup
    echo "$BACKEND_PID" > /tmp/portfolio_backend.pid
    echo "$FRONTEND_PID" > /tmp/portfolio_frontend.pid

    # Follow logs
    echo -e "${CYAN}📊 Monitoring logs (Ctrl+C to exit)...${NC}\n"

    # Trap Ctrl+C
    trap 'echo -e "\n${YELLOW}To stop servers, run:${NC} kill $BACKEND_PID $FRONTEND_PID"; exit 0' INT

    # Tail both logs
    tail -f "$BACKEND_LOG" "$FRONTEND_LOG"
}

# Run main function
main
