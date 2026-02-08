# Contributing to GitHub Wrapped

First off, thanks for taking the time to contribute! 🎉

Hey, I'm [@siyabuilds](https://github.com/siyabuilds), the creator and maintainer of this project. Contributions from the community are more than welcome!

---

## 🚀 Where to Start

Check out [MIGRATE.md](MIGRATE.md) for a structured migration plan from the current Express + Vite stack to Next.js. The phases there provide a roadmap, but **creativity is encouraged**! If you have a better approach or want to tackle something differently, open an issue first and I'd love to discuss it with you.

Some ideas beyond the migration:

- Performance optimizations
- New wrapped slides/visualizations
- Better error handling
- Accessibility improvements
- Documentation enhancements
- Bug fixes (always welcome!)

---

## 🛠️ How to Contribute

### 1. Fork the Repository

Click the **Fork** button at the top right of the [repository page](https://github.com/siyabuilds/wrapped) to create your own copy.

### 2. Clone Your Fork Locally

```bash
git clone https://github.com/YOUR-USERNAME/wrapped.git
cd wrapped
```

### 3. Set Up the Upstream Remote

```bash
git remote add upstream https://github.com/siyabuilds/wrapped.git
```

This lets you keep your fork in sync with the original repo:

```bash
git fetch upstream
git merge upstream/main
```

### 4. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
# or for migration work
git checkout -b migrate/phase-X-description
```

**Branch naming conventions:**

- `feature/` – New features or enhancements
- `fix/` – Bug fixes
- `migrate/` – Migration-related work (see MIGRATE.md)
- `docs/` – Documentation updates

### 5. Make Your Changes

- Write clean, readable code
- Follow existing code style and conventions
- Test your changes locally
- Commit with clear, descriptive messages:

```bash
git add .
git commit -m "feat: add new activity visualization slide"
# or
git commit -m "fix: handle rate limit errors gracefully"
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

1. Go to your fork on GitHub
2. Click **"Compare & pull request"**
3. Fill in the PR template with:
   - What you changed and why
   - Screenshots/recordings for UI changes
   - Any testing you've done
4. Submit the PR!

---

## 📋 Pull Request Guidelines

- Keep PRs focused – one feature/fix per PR
- Update documentation if needed
- Ensure the app still works (test both backend and frontend)
- Be responsive to feedback and review comments

---

## 💬 Questions or Ideas?

Open an [issue](https://github.com/siyabuilds/wrapped/issues) to:

- Report bugs
- Suggest features
- Ask questions
- Discuss approaches before implementing

---

## ⚠️ Important Disclaimer

> **The current implementation (Express + Vite) is fully functional and deployable!**
>
> You are more than welcome to fork this project and deploy it as-is on platforms like Render, Railway, or any hosting provider of your choice.
>
> **However**, if you're looking to contribute back to this repository, I'd really appreciate help with the **Next.js migration** (see [MIGRATE.md](MIGRATE.md)). My goal is to move to a unified Next.js app for better Vercel free-tier support and simpler deployment.
>
> That said, bug fixes and improvements to the current stack are still accepted – especially if they're architecture-agnostic and will carry over to Next.js.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE) that covers this project.

---

Thanks again for contributing! Every bit helps make GitHub Wrapped better. 💜
