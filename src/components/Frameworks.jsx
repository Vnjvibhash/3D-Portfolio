import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    'flutter',
    'firebase',
    'python',
    'django',
    'postgresql',
    'android-studio',
    'kotlin',
    'java',
    'nodejs',
    'appwrite',
    'postman',
    'mongodb',
    'git',
    'github',
    'javascript',
    'jquery',
    'react',
    'bootstrap',
    'html5',
    'css3',
    'tailwindcss',
    'auth0',
    'jwt',
    'sqlite',
    'laravel',
    'angularjs',
    'dart',
    'microsoftsqlserver',
    'microsoft',
    'figma',
    'stripe',
    'threejs',
    'visualstudiocode',
    'vue',
    'wordpress',
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={28}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={20} radius={110} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
