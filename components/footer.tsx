import Link from "next/link"
import { Github, Twitter, Linkedin, Instagram, Sparkles } from "lucide-react"

const Footer = () => {
  return (
    <footer className="relative z-10 glass-effect border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mr-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold gradient-text">AI Content Studio</h3>
            </div>
            <p className="text-muted-foreground">Revolutionizing content creation with advanced AI technology.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors inline-flex group">
                  <span>Home</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex group"
                >
                  <span>About Us</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex group"
                >
                  <span>Pricing</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/generate"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex group"
                >
                  <span>Generate Content</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex group">
                  <span>Documentation</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex group">
                  <span>Tutorials</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex group">
                  <span>Blog</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex group">
                  <span>Support</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex group">
                  <span>Privacy Policy</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex group">
                  <span>Terms of Service</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex group">
                  <span>Cookie Policy</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary mt-0.5"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AI Content Studio. All rights reserved.</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl opacity-20"></div>
    </footer>
  )
}

export default Footer

