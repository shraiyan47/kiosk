import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role, subject) => {
  const { can, rules, cannot } = new AbilityBuilder(AppAbility)
  console.log('role',role)
  if (role === 'admin') {
    can('manage', 'all')
    // cannot(['read'], ['weekly-duch', 'home-page', 'masterdata', 'section'])
    cannot(['read'], ['weekly-duch', 'home-page'])
  } else if (role === 'student') {
    can(['read'], ['acl-page', 'home-page', 'weekly-duch'])
  } else if (role === 'sysadmin') {
    can('manage', 'all')
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role, subject) => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
