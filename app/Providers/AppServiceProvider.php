<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        DB::prohibitDestructiveCommands($this->app->environment('production'));
        $this->modelConfiguration();
        $this->configureURL();
    }

    public function modelConfiguration() {
        Model::unguard();
        Model::shouldBeStrict();
    }

    public function configureURL(){
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
