import { getProviders, signIn } from 'next-auth/react';

function Login({ providers }) {
  return (
    <div className='flex flex-col items-center justify-center bg-black min-h-screen'>
      {Object.values(providers).map((provider) => {
        const name = provider.name;
        const altText = `${name} logo`;
        return (
          <div key={name}>
            <img
              className='w-52 mb-12'
              src='https://links.papareact.com/9xl'
              alt={altText}
            />
            <button
              className='p-5 pl-10 pr-10 text-white bg-[#18D860] rounded-full'
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Login with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
