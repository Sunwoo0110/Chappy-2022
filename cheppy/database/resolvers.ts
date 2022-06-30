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
    
    getUserById: async (_, { id }) => {
      try {
        // const users = await User.find({userid: userid})
        const users = await User.findById(id)
        
        return users
      } catch (err) {
        console.log(err)
      }
    },

    getUserByUserId: async (_,  { userid }) => {
      try {
        const user = await User.findOne({userid: userid})
        //const users = await User.findById(id)

        return user
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

    getIdByUserId: async (_,  { userid }) => {
      try {
        const user = await User.findOne({userid: userid})
        //const users = await User.findById(id)
        
        return user
      } catch (err) {
        console.log(err)
      }

    }
    // getProduct: async (_, { id }) => {
    //   const product = await Product.findById(id)

    //   if (!product) {
    //     throw new Error('Product not found')
    //   }

    //   return product
    // },
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

<<<<<<< HEAD
      user = await User.findOneAndUpdate({ _id: id }, input, {
        new: true,
      })

=======
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
>>>>>>> 66787d4988b48d48110de7c7e9ce04119ce501ae
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