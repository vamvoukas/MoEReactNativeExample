/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "MOEHelperConstants.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"MoEReactNativeExample"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  //This is optional, Only do it if you need the callbacks for the notification related methods
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationDidReceiveRemoteNotification:) name:MoEngage_Notification_Received_Notification object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationDidRegisterForRemoteNotification:) name:MoEngage_Notification_Registered_Notification object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationDidRegisterForUserSettings:) name:MoEngage_Notification_UserSettings_Registered_Notification object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationDidFailToRegisterForRemoteNotification:) name:MoEngage_Notification_Registration_Failed_Notification object:nil];
  
  return YES;
}


#pragma mark- MoEngage Notification Observer methods

-(void)applicationDidReceiveRemoteNotification:(NSNotification *)notification{
  NSLog(@"Notification payload :  %@",notification.userInfo);
}


-(void)applicationDidRegisterForRemoteNotification:(NSNotification *)notification{
  NSData* deviceToken = notification.userInfo[MoEngage_Device_Token_Key];
  NSLog(@"notif info :  %@ And deviceToken : %@",notification, deviceToken);
}

-(void)applicationDidRegisterForUserSettings:(NSNotification *)notification{
  
  UIUserNotificationSettings *settings = notification.userInfo[MoEngage_Notification_Settings_Key];
  NSLog(@"settings info :  %@ And settings : %@",notification,settings);
}

-(void)applicationDidFailToRegisterForRemoteNotification:(NSNotification *)notification{
  NSLog(@"settings info :  %@",notification);
}

@end
