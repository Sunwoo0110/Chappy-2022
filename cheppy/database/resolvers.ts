import User from './models/User'

const resolvers = {
  Query: {
    // Users
    getUsers: async () => {
      try {
        const users = await User.find({})

        return users
      } catch (err) {
        console.log(err)
      }
    },
    getUser: async (_, { _id }) => {
      try {
        // const users = await User.find({userid: userid})
        const user = await User.findById(_id)
        
        return user
      } catch (err) {
        console.log(err)
      }
    },
    getUserByUserId: async (_, { userid }) => {
      try {
        // const users = await User.find({userid: userid})
        const users = await User.findOne({userid: userid})
        
        return users
      } catch (err) {
        console.log(err)
      }
    },
  },


  Mutation: {
    // users
    newUser: async (_, { input }) => {
      try {
        const user = new User(input)

        const result = await user.save()

        return result
      } catch (err) {
        console.log(err)
      }
    },
    updateUserInfo: async (_, { _id, input }) => {
      let user = await User.findById(_id)

      if (!user) {
        throw new Error('User not found')
      }

      user = await User.findOneAndUpdate({ _id: _id }, input, {
        new: true,
      })
      return user
    },
    updateUserPassword: async (_, { _id, input }) => {
      let user = await User.findById(_id)

      if (!user) {
        throw new Error('User not found')
      }

      user = await User.findOneAndUpdate({ _id: _id }, input, {
        new: true,
      })
      return user
    },
    // deleteProduct: async (_, { id }) => {
    //   const product = await Product.findById(id)

    //   if (!product) {
    //     throw new Error('Producto no encontrado')
    //   }

    //   await Product.findOneAndDelete({ _id: id })

    //   return 'Producto eliminado'
    // },
  },
}

export { resolvers } ;