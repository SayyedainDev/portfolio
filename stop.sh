#!/bin/bash

# Portfolio Project Stop Script
# Gracefully stops both backend and frontend servers

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🛑 Stopping Portfolio Servers                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

# Function to kill process by PID
kill_by_pid() {
    local pid_file=$1
    local name=$2

    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "${YELLOW}🛑 Stopping $name (PID: $pid)...${NC}"
            kill $pid 2>/dev/null
            sleep 1

            # Force kill if still running
            if ps -p $pid > /dev/null 2>&1; then
                echo -e "${RED}   Force killing $name...${NC}"
                kill -9 $pid 2>/dev/null
            fi

            echo -e "${GREEN}✅ $name stopped${NC}"
        else
            echo -e "${YELLOW}⚠️  $name was not running${NC}"
        fi
        rm -f "$pid_file"
    else
        echo -e "${YELLOW}⚠️  No PID file found for $name${NC}"
    fi
}

# Function to kill by port
kill_by_port() {
    local port=$1
    local name=$2

    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${YELLOW}🛑 Stopping process on port $port ($name)...${NC}"
        lsof -ti:$port | xargs kill -9 2>/dev/null
        echo -e "${GREEN}✅ Port $port cleared${NC}"
    else
        echo -e "${GREEN}✅ Port $port already free${NC}"
    fi
}

# Try to stop using PID files first
echo -e "${CYAN}📍 Attempting to stop using PID files...${NC}"
kill_by_pid "/tmp/portfolio_backend.pid" "Backend"
kill_by_pid "/tmp/portfolio_frontend.pid" "Frontend"
echo ""

# Fallback: kill by port
echo -e "${CYAN}🔍 Checking ports...${NC}"
kill_by_port 5000 "Backend"
kill_by_port 5173 "Frontend"
echo ""

# Additional cleanup - kill any remaining node/vite processes
echo -e "${CYAN}🧹 Additional cleanup...${NC}"
pkill -f "node server.js" 2>/dev/null && echo -e "${GREEN}✅ Cleaned up node processes${NC}" || echo -e "${GREEN}✅ No additional node processes${NC}"
pkill -f "npm run dev" 2>/dev/null && echo -e "${GREEN}✅ Cleaned up npm processes${NC}" || echo -e "${GREEN}✅ No additional npm processes${NC}"
pkill -f "vite" 2>/dev/null && echo -e "${GREEN}✅ Cleaned up vite processes${NC}" || echo -e "${GREEN}✅ No additional vite processes${NC}"
echo ""

# Success message
echo -e "${GREEN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   ✅ All servers stopped successfully!                ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${CYAN}To start again, run: ${YELLOW}./run.sh${NC}\n"
