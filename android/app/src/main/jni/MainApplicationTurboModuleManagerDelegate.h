#include <memory>
#include <string>

#include <ReactCommon/TurboModuleManagerDelegate.h>
#include <fbjni/fbjni.h>

namespace facebook {
namespace react {

class MainApplicationTurboModuleManagerDelegate
    : public jni::HybridClass<
          MainApplicationTurboModuleManagerDelegate,
          TurboModuleManagerDelegate> {
 public:
  // Adapt it to the package you used for your Java class.
  static constexpr auto kJavaDescriptor =
<<<<<<< HEAD
      "Lcom/medstick_fe/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate;";
=======
      "Lcom/medstick/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate;";
>>>>>>> 1f6d13847a4889eda6a3aef75d1ea410d7b9f56f

  static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject>);

  static void registerNatives();

  std::shared_ptr<TurboModule> getTurboModule(
      const std::string name,
      const std::shared_ptr<CallInvoker> jsInvoker) override;
  std::shared_ptr<TurboModule> getTurboModule(
      const std::string name,
      const JavaTurboModule::InitParams &params) override;

  /**
   * Test-only method. Allows user to verify whether a TurboModule can be
   * created by instances of this class.
   */
  bool canCreateTurboModule(std::string name);
};

} // namespace react
} // namespace facebook
