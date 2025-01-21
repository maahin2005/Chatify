export async function checkAuth(request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    console.log("No cookies found");
    return false;
  }

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => cookie.split("="))
  );

  const token = cookies["token"];

  if (token) {
    return true;
  }
  return false;
}
