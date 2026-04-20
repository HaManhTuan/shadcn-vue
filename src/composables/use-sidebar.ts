import { BadgeHelpIcon, BellDotIcon, BoxesIcon, BugIcon, ComponentIcon, CreditCardIcon, LayoutDashboardIcon, ListTodoIcon, PaletteIcon, PictureInPicture2Icon, PodcastIcon, SettingsIcon, SquareUserRoundIcon, UserIcon, UsersIcon, WrenchIcon } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

import type { NavGroup } from '@/components/app-sidebar/types'

export function useSidebar() {
  const { t } = useI18n()

  const settingsNavItems = computed(() => [
    { title: t('sidebar.settings.profile'), url: '/settings/', icon: UserIcon },
    { title: t('sidebar.settings.account'), url: '/settings/account', icon: WrenchIcon },
    { title: t('sidebar.settings.appearance'), url: '/settings/appearance', icon: PaletteIcon },
    { title: t('sidebar.settings.notifications'), url: '/settings/notifications', icon: BellDotIcon },
    { title: t('sidebar.settings.display'), url: '/settings/display', icon: PictureInPicture2Icon },
  ])

  const navData = computed<NavGroup[]>(() => [
    {
      title: t('sidebar.group.general'),
      items: [
        { title: t('sidebar.general.dashboard'), url: '/dashboard', icon: LayoutDashboardIcon },
        { title: t('sidebar.general.tasks'), url: '/tasks', icon: ListTodoIcon },
        { title: t('sidebar.general.apps'), url: '/apps', icon: BoxesIcon },
        { title: t('sidebar.general.users'), url: '/users', icon: UsersIcon },
        { title: t('sidebar.general.aiTalkExample'), url: '/ai-talk', icon: PodcastIcon },
      ],
    },
    {
      title: t('sidebar.group.pages'),
      items: [
        {
          title: t('sidebar.pages.auth'),
          icon: SquareUserRoundIcon,
          items: [
            { title: t('sidebar.pages.signIn'), url: '/auth/sign-in' },
            { title: t('sidebar.pages.signIn2Col'), url: '/auth/sign-in-2' },
            { title: t('sidebar.pages.signUp'), url: '/auth/sign-up' },
            { title: t('sidebar.pages.forgotPassword'), url: '/auth/forgot-password' },
            { title: t('sidebar.pages.otp'), url: '/auth/otp' },
          ],
        },
        {
          title: t('sidebar.pages.errors'),
          icon: BugIcon,
          items: [
            { title: t('sidebar.pages.error401'), url: '/errors/401' },
            { title: t('sidebar.pages.error403'), url: '/errors/403' },
            { title: t('sidebar.pages.error404'), url: '/errors/404' },
            { title: t('sidebar.pages.error500'), url: '/errors/500' },
            { title: t('sidebar.pages.error503'), url: '/errors/503' },
          ],
        },
      ],
    },
    {
      title: t('sidebar.group.other'),
      items: [
        { title: t('sidebar.other.settings'), items: settingsNavItems.value, icon: SettingsIcon },
        { title: t('sidebar.other.propComponents'), url: '/prop-components', icon: ComponentIcon },
        { title: t('sidebar.other.helpCenter'), url: '/help-center', icon: BadgeHelpIcon },
        { title: t('sidebar.other.outsideGithub'), url: 'https://www.github.com/Whbbit1999/shadcn-vue-admin' },
      ],
    },
  ])

  const otherPages = computed<NavGroup[]>(() => [
    {
      title: t('sidebar.group.other'),
      items: [
        { title: t('sidebar.other.plansPricing'), icon: CreditCardIcon, url: '/billing' },
      ],
    },
  ])

  return {
    navData,
    otherPages,
    settingsNavItems,
  }
}
