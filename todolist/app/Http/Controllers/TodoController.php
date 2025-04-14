<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class TodoController extends Controller implements HasMiddleware
{
    /**
     * Display a listing of the resource.
     */

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index', "show"])
        ];
    }

    public function index()
    {
        return ["todos" => Todo::with('user')->orderByDesc('id')->limit(10)->get(), "user" => User::has('todos', '>', 0 )->get()];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
        $field = $request->validated();

        $todo = request()->user()->todos()->create($field);

        return ['todo' => $todo];
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return $todo;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {

        Gate::authorize('modify', $todo);

        $field = $request->validated();

        $todo->update($field);

        return $todo;
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        Gate::authorize('modify', $todo);

        $todo->delete();

        return ['removed', $todo->name];
    }
}
