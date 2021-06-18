'use strict'

const NewPurchaseHook = (exports = module.exports = {})
const Kue = use('Kue')
const NewPurchaseMail = use('App/Jobs/NewPurchaseMail')

NewPurchaseHook.NewPurchaseMail = async (modelInstance) => {
  const user = await modelInstance.user().fetch()

  Kue.dispatch(
    NewPurchaseMail.key,
    {
      email: user.email,
      name: user.name,
      price: modelInstance.price_total,
    },
    { attempts: 3 }
  )
}
