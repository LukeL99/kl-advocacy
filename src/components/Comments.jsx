import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export default function Comments({ pageUrl, pageIdentifier, pageTitle }) {
  useEffect(() => {
    // Disqus configuration
    window.disqus_config = function () {
      this.page.url = pageUrl;
      this.page.identifier = pageIdentifier;
      this.page.title = pageTitle;
    };

    // Load Disqus script if not already loaded
    if (!document.getElementById('disqus-script')) {
      const script = document.createElement('script');
      script.id = 'disqus-script';
      script.src = 'https://kl-advocacy.disqus.com/embed.js';
      script.setAttribute('data-timestamp', +new Date());
      (document.head || document.body).appendChild(script);
    } else {
      // Reset Disqus if script already exists
      if (window.DISQUS) {
        window.DISQUS.reset({
          reload: true,
          config: function () {
            this.page.url = pageUrl;
            this.page.identifier = pageIdentifier;
            this.page.title = pageTitle;
          }
        });
      }
    }
  }, [pageUrl, pageIdentifier, pageTitle]);

  return (
    <div className="mt-16 pt-8 border-t border-border-muted">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-6 h-6 text-primary" />
        <h3 className="font-heading text-2xl text-text-primary">Join the Conversation</h3>
      </div>
      
      <div className="bg-bg-muted rounded-2xl p-6 mb-6">
        <p className="text-text-muted text-sm mb-2">
          💬 Share your thoughts, ask questions, or tell us about your IEP experience. 
          We'd love to hear from you!
        </p>
        <p className="text-text-muted text-xs">
          Please keep comments respectful and on-topic. All comments are moderated.
        </p>
      </div>

      <div id="disqus_thread"></div>
      
      <noscript>
        <p className="text-text-muted text-sm italic">
          Please enable JavaScript to view the comments.
        </p>
      </noscript>
    </div>
  );
}
