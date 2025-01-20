export default function FeaturesSection() {
  const features = [
    // {
    //   icon: "📹", // Emoji placeholder for camcorder icon
    //   heading: "Video messaging",
    //   description: "This software is very easy for you to manage. You can use it as you wish.",
    // },
    {
      icon: "💬", // Emoji placeholder for chat icon
      heading: "Instant Messaging",
      description: "Send messages instantly to anyone, anywhere, at any time.",
    },
    {
      icon: "🔒", // Emoji placeholder for lock icon
      heading: "Secure Conversations",
      description: "Your messages are encrypted and safe with our technology.",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Features for a better experience
        </h2>
        <p className="mt-2 text-gray-600">
          Explore our amazing features that simplify your communication
          experience.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6 md:flex-row md:justify-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-white rounded-lg max-w-sm"
          >
            <div className="text-4xl text-primary">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.heading}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
