package com.wd15.model;

public class SuperAdmin extends Admin{
    private boolean canDeleteData;
    private String managedDepartments;

    // Empty constructor
    public SuperAdmin() {
    }

    // Full constructor
    public SuperAdmin(String adminCode, String name, String email, String password,
                      String accessLevel, String managedDepartments) {

        super(adminCode, name, email, password, accessLevel);
        this.canDeleteData = true;
        this.managedDepartments = managedDepartments;
    }

    // Getters & Setters
    public boolean isCanDeleteData() {
        return canDeleteData;
    }

    public void setCanDeleteData(boolean canDeleteData) {
        this.canDeleteData = canDeleteData;
    }

    public String getManagedDepartments() {
        return managedDepartments;
    }

    public void setManagedDepartments(String managedDepartments) {
        this.managedDepartments = managedDepartments;
    }

    // Override (Polymorphism)
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Role: Super Admin");
        System.out.println("Can Delete Data: " + canDeleteData);
        System.out.println("Departments: " + managedDepartments);
        System.out.println("==========================");
    }
}
