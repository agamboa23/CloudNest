# Testing cURL
# MAKEFILE

# C Compiler (Default: gcc)
CXX = gcc
CFLAGS =

# Librarys
INCLUDE = -I
LDFLAGS = -L
LDLIBS = -lcurl

# Details
SOURCES = main.c connector.c
OUT = test

all: build

build: $(SOURCES)
	$(CXX) -o $(OUT) $(INCLUDE) $(CFLAGS) $(LDFLAGS) $(LDLIBS) $(SOURCES)