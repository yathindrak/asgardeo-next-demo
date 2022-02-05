import { useSession, getSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const JsonRenderer = dynamic(() => import('../components/JsonRenderer'), {
    ssr: false
  })

  return (
    <>
      <Head>
        <title>Asgardeo Next-Auth Demo</title>
        <meta name="description" content="Asgardeo Next-Auth Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={'mx-10'}>
        {
          session ? (
            <>
              <p className={'my-8 text-5xl lg:text-3xl font-bold tracking-tight text-gray-900'}>
                User Information
              </p>
              {session?.user ?
                (
                  <JsonRenderer
                    src={session?.user}
                    name={null}
                    enableClipboard={false}
                    displayObjectSize={false}
                    displayDataTypes={false}
                    iconStyle="square"
                    theme="monokai"
                  />
                ) : null}
            </>
          ) :
            (
              <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                  <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
                    <div className='mb-6 sm:mx-auto cursor-pointer'>
                      <Link href="https://wso2.com/asgardeo/" passHref={true}>
                        <Image src="/asgardeo-logo.svg" height={200} width={200} />
                      </Link>
                    </div>
                    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                      <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        <span className="relative inline-block">
                          <svg viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                            <defs>
                              <pattern id="e77df901-b9d7-4b9b-822e-16b2d410795b" x="0" y="0" width=".135" height=".30">
                                <circle cx="1" cy="1" r=".7"></circle>
                              </pattern>
                            </defs>
                            <rect fill="url(#e77df901-b9d7-4b9b-822e-16b2d410795b)" width="52" height="24"></rect>
                          </svg>
                          <span className="relative">Create</span>
                        </span>
                        {" "}seamless login experiences in minutes
                      </h2>
                      <p className="text-base text-gray-700 md:text-lg">
                        Asgardeo helps developers implement secure authentication flows to applications in a few simple steps.
                      </p>
                    </div>
                    <div>
                    <Link href="https://wso2.com/asgardeo/" passHref={true}>
                      <button
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      >
                        Get started
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
        }
      </main>
    </>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}