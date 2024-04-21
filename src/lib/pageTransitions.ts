import gsap from 'gsap'
import {
  AppRouterInstance,
  NavigateOptions
} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { usePathname, useRouter } from 'next/navigation'

export const animatePageIn = () => {
  const transitionElement = document.getElementById('transition-element')

  if (transitionElement) {
    gsap.set(transitionElement, {
      yPercent: 0
    })
    gsap.to(transitionElement, {
      yPercent: 100,
      duration: 0.8,
      ease: 'power4.inOut'
    })
  }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const animationWrapper = document.getElementById('transition-element')

  if (animationWrapper) {
    gsap.set(animationWrapper, {
      yPercent: -100
    })
    gsap.to(animationWrapper, {
      yPercent: 0,
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
        router.push(href)
      }
    })
  } else {
    router.push(href)
  }
}

export const useTransitionRouter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const push: (href: string, options?: NavigateOptions) => void = (href) => {
    if (href !== pathname) {
      animatePageOut(href, router)
    }
  }

  return { ...router, push }
}
