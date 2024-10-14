
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "vue": async () => {
          let pkg = await import("__mf__virtual/library__prebuild__vue__prebuild__.js")
          return pkg
        }
      ,
        "test": async () => {
          let pkg = await import("__mf__virtual/library__prebuild__test__prebuild__.js")
          return pkg
        }
      ,
        "test/utils": async () => {
          let pkg = await import("__mf__virtual/library__prebuild__test_mf_1_utils__prebuild__.js")
          return pkg
        }
      ,
        "test/components": async () => {
          let pkg = await import("__mf__virtual/library__prebuild__test_mf_1_components__prebuild__.js")
          return pkg
        }
      ,
        "lodash": async () => {
          let pkg = await import("__mf__virtual/library__prebuild__lodash__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "vue": {
            name: "vue",
            version: "3.5.12",
            scope: ["default"],
            loaded: false,
            from: "library",
            async get () {
              usedShared["vue"].loaded = true
              const {"vue": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^3.5.12"
            }
          }
        ,
          "test": {
            name: "test",
            version: "1.0.0",
            scope: ["default"],
            loaded: false,
            from: "library",
            async get () {
              usedShared["test"].loaded = true
              const {"test": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^1.0.0"
            }
          }
        ,
          "test/utils": {
            name: "test/utils",
            version: "1.0.0",
            scope: ["default"],
            loaded: false,
            from: "library",
            async get () {
              usedShared["test/utils"].loaded = true
              const {"test/utils": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^1.0.0"
            }
          }
        ,
          "test/components": {
            name: "test/components",
            version: "1.0.0",
            scope: ["default"],
            loaded: false,
            from: "library",
            async get () {
              usedShared["test/components"].loaded = true
              const {"test/components": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^1.0.0"
            }
          }
        ,
          "lodash": {
            name: "lodash",
            version: "4.17.21",
            scope: ["default"],
            loaded: false,
            from: "library",
            async get () {
              usedShared["lodash"].loaded = true
              const {"lodash": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^4.17.21"
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      