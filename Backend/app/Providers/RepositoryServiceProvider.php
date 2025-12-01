<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            \App\Contracts\TimetableRepositoryInterface::class,
            \App\Repositories\EloquentTimetableRepository::class
        );

        $this->app->bind(
            \App\Contracts\SchedulerClientInterface::class,
            \App\Services\SchedulerGrpcClient::class
        );
    }

    public function boot()
    {
        //
    }
}
