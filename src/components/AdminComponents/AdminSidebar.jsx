import { Fragment, useContext, useState } from 'react'
import { FaBars, FaBell } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'


const navigation = [
  { name: 'dashboard', href: '/dashboard' },
  { name: 'users', href: '/dashboard/users' },
  { name: 'products', href: '/dashboard/products' },
  { name: 'category', href: '/dashboard/category' },
  { name: 'orders', href: '/dashboard/orders' },
  // { name: 'contact', href: '/dashboard/contact' },
]
const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
]

export default function AdminSidebar() {

  const [open, setOpen] = useState(false)
  const location = useLocation()

  const authUser = useContext(AuthContext)

  if (!location.pathname.includes("/dashboard")) {
    return
  }

  const logout = () => {
    localStorage.removeItem("_hw_token");
    localStorage.removeItem("_hw_userDetails");

    setTimeout(() => {
      window.location.href = "/login"
    }, 400)
  };

  return (
    <div className={`fixed z-50 md:z-0 md:sticky items-start md:bg-[#151036] dark:bg-gray-900 max-w-[200px] w-10 h-10 md:h-screen md:w-full top-5 md:top-0 ${open ? 'w-52 bg-[#151036] h-screen min-h-full overflow-auto !top-0' : ' h-10 '}`}>
      <>
        <div className="mx-auto max-w-7xl  ">
          <div className="flex flex-col h-full  justify-between">
            <div className="flex flex-col ">

              <div className="hidden md:block mt-10">
                <div className=" flex flex-col items-baseline space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={(`${location.pathname === item.href
                        ? 'bg-white text-gray-800'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white '
                        }  px-5 py-2 w-full text-sm font-medium capitalize`)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className=" flex items-center">
                {/* <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <FaBell className="h-6 w-6" aria-hidden="true" />
                  </button> */}


              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <button
                onClick={() => {
                  setOpen(!open)
                }}
                className="relative inline-flex items-center justify-center rounded-md  p-2 text-gray-700 hover:bg-gray-100 focus:outline-none ">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <MdClose className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FaBars className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${open ? "block" : "hidden"}`}>
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${location.pathname === item.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white '
                  } block rounded-md px-3 py-2 text-base font-medium capitalize w-full text-left`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                {authUser?.userDetails?.image ? (
                  <img
                    className="w-7 rounded-full object-cover object-center sm:w-8 md:w-8 h-7"
                    src={`${import.meta.env.VITE_APP_BASE_URI}${authUser?.userDetails?.image}`}
                    alt="user photo"
                  />
                ) : (
                  <img
                    className="w-7 rounded-full object-cover object-center sm:w-8 md:w-7 h-7 border"
                    src="/defaultUserImage.png"
                    alt="user photo"
                  />
                )}
              </div>
              {/* <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{user.name}</div>
                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
              </div> */}
              {/* <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <FaBell className="h-6 w-6" aria-hidden="true" />
                </button> */}
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  logout()
                }}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </>

      {/* <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 ">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header> */}
      {/* <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          Content
        </div>
      </main> */}
    </div>
  )
}
