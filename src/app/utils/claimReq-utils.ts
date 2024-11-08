export const claimReq = {
  adminOnly: (c: any) => c.role == "Admin",
  adminOrOwner: (c: any) => c.role == "Admin" || c.role == "Owner",
  hasLibraryId: (c: any) => 'libraryID' in c,
  femaleUsers: (c:any) => c.gender == "Female" && c.role == "User",
  maleUsersUnderAgeOf10: (c:any) => c.gender == "Male" && c.role == "User" && parseInt(c.age) < 10
}
