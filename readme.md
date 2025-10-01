# ⚡ Quickstart

A simple, modular **Next.js full-stack boilerplate** — batteries included! 🚀

## Getting Started

1. **Clone the repository**
   Choose your project name and branch (see [Branches](#branches)).

   ```zsh
   git clone https://github.com/martin-dinahet/quickstart --branch=main my-cool-app
   cd my-cool-app
   ```

2. **Install dependencies**

   ```zsh
   pnpm install
   ```

3. **Set up environment variables**

   * Add your database URL in a new `.env` file.
   * If you’re using the `auth` branch, also include a `SESSION_KEY`.

   Example `.env`:

   ```env
   DATABASE_URL="your-database-url"
   SESSION_KEY="super-secret-key"
   ```

4. **Run database migrations**
   Generate the Prisma client and apply migrations to your database:

   ```zsh
   pnpm prisma generate
   pnpm prisma migrate dev
   ```

5. **Run the development server**

   ```zsh
   pnpm dev
   ```

   Your app will be live at [http://localhost:3000](http://localhost:3000).

---



## UI Components: DaisyUI

This project uses **DaisyUI** as a Tailwind CSS plugin for rapid, beautiful UI development.

- **What is DaisyUI?**  
   DaisyUI is a Tailwind CSS component library that provides pre-styled, customizable UI elements. It helps you build modern interfaces quickly without writing custom CSS.

- **Integration:**  
   DaisyUI is installed as a dependency and imported in `src/tailwind.css` using `@plugin "daisyui";`.  
   Tailwind CSS is also set up in the project, so you can use both Tailwind utility classes and DaisyUI components together.

- **Usage:**  
   Use DaisyUI classes (e.g., `btn`, `card`, `input`, `fieldset`, etc.) in your React components. See the sign-in and sign-up pages for examples:
   - `fieldset`, `input`, `label`, and other DaisyUI classes are used for form styling.

- **Customization:**  
   DaisyUI supports themes and customization. You can adjust its config in your Tailwind setup to match your branding.

- **Learn More:**  
   Visit [daisyui.com](https://daisyui.com) for documentation and examples.

---

## Authentication (`auth` branch)

The `auth` branch adds a simple authentication system to the boilerplate. Here’s how it works:

- **Sign In & Sign Up Pages:**  
   Located at `/src/app/auth/sign-in/page.tsx` and `/src/app/auth/sign-up/page.tsx`.  
   These pages provide forms for users to log in or create an account using email, password, and (for sign-up) username.

- **Form Handling:**  
   The forms use React’s `useActionState` to manage submission, validation errors, and loading state.  
   On submit, the form calls an action (e.g., `signIn` or `signUp`) to process credentials.

- **Server Actions:**  
   The actual authentication logic (checking credentials, creating users, etc.) is handled by server actions (not shown in the current codebase, but typically found in `/src/lib/actions/auth/`).  
   These actions interact with your database (via Prisma) to verify users and manage sessions.

- **Session Management:**  
   You must set a `SESSION_KEY` in your `.env` file.  
   This key is used to sign and verify session tokens, keeping users logged in securely.

- **Environment Variables:**  
   Add both `DATABASE_URL` and `SESSION_KEY` to your `.env` file for authentication to work.

- **Extending Auth:**  
   You can customize authentication logic, add OAuth providers, or enhance validation by editing the server actions and form components.

---

### 🔀 Branches

* `main` → minimal setup
* `auth` → authentication included
