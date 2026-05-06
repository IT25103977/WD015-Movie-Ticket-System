package com.wd15.model;

public class RegularAdmin extends Admin{

    private String assignedSection;
    private String supervisorCode;
    private boolean canDeleteData;

    // Empty constructor
    public RegularAdmin() {
    }

    // Full constructor
    public RegularAdmin(String adminCode, String name, String email, String password,
                        String accessLevel, String assignedSection, String supervisorCode) {

        super(adminCode, name, email, password, accessLevel);
        this.assignedSection = assignedSection;
        this.supervisorCode = supervisorCode;
        this.canDeleteData = false;
    }

    // Getters & Setters
    public String getAssignedSection() {
        return assignedSection;
    }

    public void setAssignedSection(String assignedSection) {
        this.assignedSection = assignedSection;
    }

    public String getSupervisorCode() {
        return supervisorCode;
    }

    public void setSupervisorCode(String supervisorCode) {
        this.supervisorCode = supervisorCode;
    }

    public boolean isCanDeleteData() {
        return canDeleteData;
    }

    public void setCanDeleteData(boolean canDeleteData) {
        this.canDeleteData = canDeleteData;
    }

    // Override
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Role: Regular Admin");
        System.out.println("Assigned Section: " + assignedSection);
        System.out.println("Supervisor Code: " + supervisorCode);
        System.out.println("Can Delete Data: " + canDeleteData);
        System.out.println("==========================");
    }
}
