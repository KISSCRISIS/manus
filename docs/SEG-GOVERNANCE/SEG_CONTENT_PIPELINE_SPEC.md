# SEG Content Pipeline Specification

**Version:** 1.0\
**Date:** 2026-08-17

------------------------------------------------------------------------

# Objective

Create a controlled workflow for transforming medical resources into SEG
learning content.

------------------------------------------------------------------------

# Supported Source Types

Initial source categories:

-   PDF books.
-   Images.
-   HTML resources.
-   Question banks.
-   Structured medical references.

------------------------------------------------------------------------

# Pipeline

    Raw Sources
        ↓
    Extraction
        ↓
    Cleaning
        ↓
    Normalization
        ↓
    SEG Schema
        ↓
    Medical Review
        ↓
    Approval
        ↓
    Database Integration
        ↓
    Application

------------------------------------------------------------------------

# Medical Governance Requirements

Every medical content item requires:

-   Source.
-   Version.
-   Reviewer.
-   Review Status.
-   Audit Trail.

------------------------------------------------------------------------

# Implementation Strategy

Start with:

-   One specialty.
-   One source set.
-   One validated content workflow.

After validation, scale the process.
