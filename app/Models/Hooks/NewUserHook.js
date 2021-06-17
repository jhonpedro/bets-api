'use strict'

const Kue = use('Kue')
const NewUserMailJob = use('App/Jobs/NewUserMail')

const NewUserHook = (exports = module.exports = {})

NewUserHook.NewUserMail = async (modelInstance) => {
  Kue.dispatch(
    NewUserMailJob.key,
    {
      name: modelInstance.name,
      email: modelInstance.email,
    },
    {
      attemts: 3,
    }
  )
}
