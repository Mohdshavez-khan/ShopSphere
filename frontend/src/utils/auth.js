export const AUTH_EVENT_NAME = "auth:change";

export function getStoredAuth() {
  if (typeof window === "undefined") {
    return { token: null, user: null, isAuthenticated: false };
  }

  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("user");

  let user = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = null;
    }
  }

  return {
    token,
    user,
    isAuthenticated: Boolean(token && user),
  };
}

export function setStoredAuth(token, user) {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }

  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export function removeTokenFromStorage() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("token");
}

export function clearStoredAuth() {
  if (typeof window === "undefined") {
    return;
  }

  removeTokenFromStorage();
  localStorage.removeItem("user");
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export function getUserFirstName(user) {
  if (!user) return "User";

  const fullName = typeof user.name === "string" ? user.name.trim() : "";
  if (fullName) {
    return fullName.split(/\s+/)[0];
  }

  if (typeof user.email === "string" && user.email.includes("@")) {
    return user.email.split("@")[0];
  }

  return "User";
}
